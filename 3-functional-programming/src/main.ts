import { distance } from './utils';
import { Either, fromPromise, ap, right, getOrElse, flatten, left } from './fp/either';
import { pipe, matcher } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser } from './types';
import { Maybe, isNone, getOrElse as getOrMaybe } from './fp/maybe';
import { map, sort } from './fp/array';
import { fromNullable } from './fp/maybe';
import { Ordering } from './fp/ord';
import { fromCompare, revert } from './fp/ord';
import { Demand } from './types';

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise<string, Array<ClientUser>>(fetchClient().then((data) => {
  return pipe(data, (clientArr) => map<typeof clientArr[number], ClientUser>((client) => ({...client, demands: fromNullable(client.demands)}))(clientArr))
}));

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const comparePosition = (clientA: ClientUser, clientB: ClientUser) => {
    const clientADistance = distance(clientA.position, executor.position);
    const clientBDistance = distance(clientB.position, executor.position);

    if(clientADistance === clientBDistance) {
      return Ordering.equal
    } else if(clientADistance > clientBDistance) {
      return Ordering.greater
    } else {
      return Ordering.less
    }
  }
  const compareReward = (clientA: ClientUser, clientB: ClientUser) => {
    if(clientA.reward === clientB.reward) {
      return Ordering.equal
    } else if(clientA.reward > clientB.reward) {
      return Ordering.greater
    } else {
      return Ordering.less
    }
  }

  const distanceOrd = fromCompare(comparePosition);
  const rewardOrd = revert(fromCompare(compareReward));

  const compareClients = (clientA: ClientUser, clientB: ClientUser): number => {
    return sortBy === SortBy.reward ? rewardOrd.compare(clientA, clientB) : distanceOrd.compare(clientA, clientB);
  };

  const sortedClients = [...clients].sort(compareClients);

  const meetMatcher = matcher(
    [(length: number) => !length, () => 'cannot meet the demands of any client!'],
    [(length: number) => length < sortedClients.length, (num) => `meets the demands of only ${num} out of ${sortedClients.length} clients`],
    [(length: number) => length === sortedClients.length, () => 'meets all demands of all clients!']
  )

  const matcherSort = matcher(
    [(sorter: SortBy) => sorter === SortBy.reward, (sorter) => 'highest reward'],
    [(sorter: SortBy) => sorter === SortBy.distance, (sorter) => 'distance to executor'],
  );

  const filtered = sortedClients.filter((client: ClientUser) => 
    isNone(client.demands) || getOrMaybe(() => [])(client.demands).some(
      (demand: Demand) => executor.possibilities.some((possibleDemand) => demand === possibleDemand)
    ) 
  );

  const res = pipe(
    'This executor ', 
    (str) => str + meetMatcher(filtered.length),
    (str) => str + (filtered.length ? '\n\nAvailable clients sorted by ' + matcherSort(sortBy) + ':\n' : ''),
    (str) => str + map((client: ClientUser) => `name: ${client.name}, distance: ${distance(client.position, executor.position)}, reward: ${client.reward}`)(filtered).join('\n')
    );

  return filtered.length ? right(res) : left(res);
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);

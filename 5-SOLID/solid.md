# SOLID Homework

Repo: [VSCode](https://github.com/microsoft/vscode)

### 1. Single Responsibility Principle

#### Example: 
https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/textModelEvents.ts
class ModelRawLineChanged (line 206), class ModelRawLinesDeleted (line 232), class ModelRawLinesInserted (line 253)
Each of these classes has only one responsibility, describing a single event, thus adhering to the SRP.

#### Violation:
https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/widget/codeEditorWidget.ts
class CodeEditorWidget (line 112)
Too much logic and methods in a single class


### 2. Open / Closed Principle

#### Example:
https://github.com/microsoft/vscode/blob/main/src/vs/base/browser/ui/list/listView.ts
class ElementsDragAndDropData (line 99)
class ExternalElementsDragAndDropData (line 122)
class NativeDragAndDropData (line 137)


#### Violation:
https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/cursorCommon.ts
lines: 182-191
To add more options it would require adding more case instances so it's open for modification, which violates the OCP.

### 3. Liskov Substitution Principle

#### Example:
https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/testing/browser/testExplorerActions.ts
export class HideTestAction extends Action2 (line 72)
export class UnhideTestAction extends Action2 (line 95)
export class UnhideAllTestsAction extends Action2 (line 119)
(and others in this file)

#### Violation:
https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/viewParts/rulers/rulers.ts
class Rulers extends ViewPart (line 14)
and
https://github.com/microsoft/vscode/blob/main/src/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.ts
class ScrollDecorationViewPart extends ViewPart (line 15)

### 4. Interface Seggregation Principle

#### Example:
https://github.com/microsoft/vscode/blob/ce00cd7812aa1c8fa63cf5630f28fd3f9197fdc6/src/vs/workbench/api/common/extHost.protocol.ts
interface MainThreadClipboardShape extends IDisposable (line 94)
interface MainThreadCommandsShape extends IDisposable (line 99)
(and some other in this file)

Thee two interfaces both extend a common interface which complies with the ISP.

#### Violation:
https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/textModelEvents.ts
Line 206 class ModelRawLineChanged and line 232 ModelRawLinesDeleted.
These two classes don't implement any interfaces but due to some overlapping properties they could have implemented 2 interfaces that, in turn, would have been 2 implementations of one common interface. In such case it would've satisfy the Interface Segregation principle.

### 5. Dependency Inversion Principle

#### Example:
https://github.com/microsoft/vscode/blob/main/extensions/extension-editing/src/packageDocumentHelper.ts
line 36

#### Violation:
https://github.com/microsoft/vscode/blob/3ba86a3c9f8ac5d02779c60cf6abe06c6a2ebdda/src/vs/workbench/browser/actions/listCommands.ts
line 155
Instead of checking for what class this instance belongs to logic for each case could have been moved to separate functions adding an extra layer.


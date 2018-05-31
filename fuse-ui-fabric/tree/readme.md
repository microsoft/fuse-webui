# Tree component

Tree component is made up with 2 types sub component

1. The TreeNodeView which renders the leaf node or a whole subtree
2. The TreeView which renders a single root TreeNodeView and other tree scoped components such as
   1. selection
   2. context menu
   3. toolbar
   4. keyboard navigation

##  TreeNodeView

this component use local state to track

1. Whether the first level sub nodes are expanded.
1. Is the node in editing mode
1. Is the node selected (also inform the TreeView of selection change)

## TreeView

this component manages the following

1. track which node is selected
1. manages the placement and visibility of the context menu

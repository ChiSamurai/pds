export interface TreeNode<T = unknown> {
  children?: Array<TreeNode & T>;
}
export type Tree<T = unknown> = Array<TreeNode<T> & T>;

export interface FlatTreeNode {
  level: number;
  hasChildren: boolean;
  childCount?: number;
}
export type FlatTree<T = unknown> = Array<FlatTreeNode & T>;

export interface FlattenTreeOptions {
  baseLevel?: number;
  keepChildren?: boolean;
}

/** @experimental */
export function flattenTree<T>(tree: Tree<T>, options?: FlattenTreeOptions): FlatTree<T> {
  if (tree == null) return;

  return (Array.isArray(tree) ? tree : [tree]).reduce((flatTree, node) => {
    let childTree: FlatTree<T> = [];

    const level = options?.baseLevel || 0;
    const nodeClone = Object.assign({}, node);
    const children = Array.from(node.children);
    const childCount = children?.length;
    const hasChildren = childCount > 0;

    if (hasChildren) childTree = flattenTree<T>(children as Tree<T>, { baseLevel: level + 1 });

    if (!options.keepChildren) delete nodeClone.children;

    const flatNode = { ...nodeClone, level, hasChildren, childCount } as FlatTreeNode & T;
    return [...flatTree, flatNode, ...childTree];
  }, []);
}

export interface RestoreTreeOptions {
  keepFlatTreeProps?: boolean;
}

/** @experimental */
export function restoreTree<T>(flatTree: FlatTree<T>, options?: RestoreTreeOptions): Tree<T> {
  let workingIndex = 0;
  return (
    flatTree &&
    flatTree.reduce((tree, flatNode, i) => {
      if (i < workingIndex) return tree;

      let lastChildIndex = i + 1;
      const nodeClone = Object.assign({}, flatNode);
      const nextNode = flatTree[lastChildIndex];
      const hasChildren = (nextNode && nextNode.level > flatNode.level) || flatNode.hasChildren;
      const parentLevel = flatNode.level;

      if (!options?.keepFlatTreeProps) {
        delete nodeClone.level;
        delete nodeClone.childCount;
        delete nodeClone.hasChildren;
      }

      let insertion: TreeNode & T;
      if (hasChildren) {
        const descendants: FlatTreeNode[] = [];
        let nextChild: FlatTreeNode = nextNode;
        while (nextChild != null && nextChild.level > parentLevel) {
          descendants.push(nextChild);
          nextChild = flatTree[++lastChildIndex];
        }

        const children = restoreTree(descendants);
        insertion = { ...nodeClone, children } as TreeNode & T;
      } else {
        insertion = nodeClone as TreeNode & T;
      }
      workingIndex = lastChildIndex;

      return [...tree, insertion];
    }, [])
  );
}

//If you know a solution is not far from the root of the tree:
// BFS is the best choice because it search row by row examining each node left to right.

//If the tree is very deep and solutions are rare, 
// BFS is the answer (DFS will take long time.) And because solutions are rare DFS is going to keep 
// going over and over all the different nodes

//If the tree is very wide:
// DFS (BFS will need too much memory)

//If solutions are frequent but located deep in the tree
// DFS

//determining whether a path exists between two nodes
// This is what DFS is built for

//Finding the shortest path
// BFS
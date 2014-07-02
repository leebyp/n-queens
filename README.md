#n-queens

A Javascript implementation of the classical n-queens problem. Initially a very brute force method was taken to check or collisions between placing queens across the whole board, and checking for the solutions. Optimizations to the code were introduced, culminating in a method to keep track used columns/rows/diagonals using binary operations and bitshifting.

This greatly improved the speed to reach solutions:
n=9(9000ms) ===> n=12(40ms) and n=13(400ms) [symmetry properties were exploited for even n]

This was originally a project from Hack Reactor's curriculum.

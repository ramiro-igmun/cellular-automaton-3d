# Cellular automaton 3D

The app renders and evolves a 3D cellular automaton according to a given set of rules and a neighboorhood type. It is developed in ***vanilla javascript*** using [Zdog](https://zzz.dog/) as a rendering engine.

A cellular automaton consists of a regular grid of cells, each in one of a finite number of states, such as on and off. For each cell, a set of cells called its neighborhood is defined relative to the specified cell. An initial state (time t = 0) is selected by assigning a state for each cell. A new generation is created (advancing t by 1), according to some fixed rule that determines the new state of each cell in terms of the current state of the cell and the states of the cells in its neighborhood.

![xx](./CA.gif)
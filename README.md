# Mock-atang44-hkmin

https://github.com/cs0320-f23/mock-atang44-hkmin

Team members: atang44, hkmin
Time spent: ~8 hours

### Design choices

Our app consists of two main components, REPLInput and REPLHistory. REPLInput handles user input and the logic for producing the appropriate output. The input box, as well as the state that manages input, is handled by the ControlledInput component, which was taken from the gearup. When inputs are taken in, appropriate handling methods are called, which then subsequently called the mocked responses that are in the mockedJson class. REPLHistory handles the formatting of the output history in a user-friendly way.

Mock data is stored and handled by mockedJson. MockedJson contains mocked data, as well as functions for handling the data returned by load_file, view, and search. The functions take in the users input, as given by REPLInput, and return the appropriate mocked data.

### Errors

We ran into some issues running playwright, as we were unsure which directory to run playwright in. We were able to resolve this quickly.
We also had slight trouble in outputting the 2D array in a valid format, and to accomodate with having a 2D array as a potential output we converted all string outputs given by mockedJson turned into 2D arrays in the REPLInput class.

### Tests

Our test suite covers all commands, mode, load_file, view, search, in both brief and verbose modes. We covered edge cases like filepath being invalid and empty, viewing and searching before loading, search with invalid arguments and different shapes of arguments. We also tested proper state changes going from brief mode, to verbose, and back to brief.

The entire test suite can be run using the command
'''
npx playwright test
'''

The program itsself can be run suing the command 
'''
npm start
'''

In RxJS, methods that transform or query sequences are called operators.
Operators are found in the static Rx.Observable object and in Observable
instances. In our example, create is one such operator.


## One Data Type to Rule Them All
In an RxJS program, we should strive to have all data in Observables, not just data
that comes from asynchronous sources. Doing that makes it easy to combine data
from different origins, like an existing array with the result of a callback, or the result
of an XMLHttpRequest with some event triggered by the user.
For example, if we have an array whose items need to be used in combination with
data from somewhere else, it’s better to make this array into an Observable. (Obviously,
if the array is just an intermediate variable that doesn’t need to be combined, there
is no need to do that.



### run
PS> C:\User\> ./run.bash
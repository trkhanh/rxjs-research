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


### INTERVIEW QUESTION 

#### GENERAL KNOWLEAGDE
1. What is an Subject? Could you list out and explain all of them?
   -   AsyncSubject 
        + If ( lastEmmit )
        -   stream 1:                  ----1----2-----3----|--->
        -   stream 2: subscribe(t=t/2)           ⇫----3----|---> 
        -   stream 3: subscribe(t=0)   ⇫--------------3----|--->
        + Else
        -   stream 1:                  ----1----2-----X----|--->
        -   stream 2: subscribe(t=t/2)           ⇫----X----|---> 
        -   stream 3: subscribe(t=0)   ⇫--------------X----|--->
  
   -   BehaviorSubject 
        + If ( lastEmmit )
        -   stream 1: BehaviorSubject (4)  ----1----2-----3----|--->
        -   stream 2: subscribe(t=0)       ⇫-4-1----2-----3----|---> 
        -   stream 3: subscribe(t=t/2)                ⇫ 2-3----|--->  
        + Else if( Observable terminates with an error)
        -   stream 1: BehaviorSubject (4)   --1---X------------|--->
        -   stream 2: subscribe(t=t/2)               ⇫----X----|---> 
        -   stream 3: subscribe(t=0)       ⇫--4-1-X------------|--->  
  
   -   PublishSubject
        + If ( lastEmmit )
        -   stream 1:                      ----1----2-----3----|--->
        -   stream 2: subscribe(t=0)        ⇫--1----2-----3----|---> 
        -   stream 3: subscribe(t=t/2)                 ⇫--3----|--->  
        + Else if( Observable terminates with an error)
        -   stream 1: BehaviorSubject (4)   --1---2------X-----|--->
        -   stream 2: subscribe(t=t/2)               ⇫---X-----|---> 
        -   stream 3: subscribe(t=0)       ⇫--1---2------X-----|--->  

   -   ReplaySubject
       + If ( lastEmmit )
        -   stream 1:                     ----1----2-----3----|--->
        -   stream 2: subscribe(t=0)       ⇫--1----2-----3----|---> 
        -   stream 3: subscribe(t=t/2)                ⇫123----|--->
                                                   OR ⇫1--23--|--->
        + Else if( Observable terminates with an error)
        -   stream 1: BehaviorSubject (4)   --1---2------X-----|--->
        -   stream 2: subscribe(t=t/2)               ⇫---X-----|---> 
        -   stream 3: subscribe(t=0)       ⇫--1---2------X-----|---> 

2. Could you explain core pattern of Reactive Programing?
3. What different between Reactor Pattern vs Observer Pattern?
4. When do you use Subject and when not?     http://davesexton.com/blog/post/To-Use-Subject-Or-Not-To-Use-Subject.aspx
5. Please explain what are  " Builder Pattern" how was that cooperate with RX?
6. Could I call observer by “subscriber,” “watcher,” or “reactor.”?
7. What are “Hot” and “Cold” Observables?
8. What is  “Connectable” Observable?
9. Please implement Proactor pattern by JS?
10. Could you list out 10 concurrency pattern?
    
   
#### RAMDOM ASK FOR INTERVIEE KNOWLEGDE



1. Creating Observables](operators.html#creating)
`Create`, `Defer`, `Empty`/`Never`/`Throw`, `From`, `Interval`, `Just`, `Range`, `Repeat`, `Start`, and `Timer`

2. Transforming Observable Items](operators.html#transforming)
`Buffer`, `FlatMap`, `GroupBy`, `Map`, `Scan`, and `Window`

3. Filtering Observables](operators.html#filtering)
`Debounce`, `Distinct`, `ElementAt`, `Filter`, `First`, `IgnoreElements`, `Last`, `Sample`, `Skip`, `SkipLast`, `Take`, and `TakeLast`

4. Combining Observables](operators.html#combining)
`And`/`Then`/`When`, `CombineLatest`, `Join`, `Merge`, `StartWith`, `Switch`, and `Zip`

5. Error Handling Operators](operators.html#error)
`Catch` and `Retry`

6. Utility Operators](operators.html#utility)
`Delay`, `Do`, `Materialize`/`Dematerialize`, `ObserveOn`, `Serialize`, `Subscribe`, `SubscribeOn`, `TimeInterval`, `Timeout`, `Timestamp`, and `Using`

7. Conditional and Boolean Operators](operators.html#conditional)
`All`, `Amb`, `Contains`, `DefaultIfEmpty`, `SequenceEqual`, `SkipUntil`, `SkipWhile`, `TakeUntil`, and `TakeWhile`

8. Mathematical and Aggregate Operators](operators.html#mathematical)
`Average`, `Concat`, `Count`, `Max`, `Min`, `Reduce`, and `Sum`

9. Converting Observables](operators.html#conversion)
`To`

10. Connectable Observable Operators](operators.html#connectable)
`Connect`, `Publish`, `RefCount`, and `Replay`

11. Backpressure Operators](operators/backpressure.html)
a variety of operators that enforce particular flow-control policies


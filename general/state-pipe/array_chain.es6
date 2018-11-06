let stringArray = [...10000]

stringArray.map((str) => {
    return str.toUpperCase();
}).filter(str => {
    return /^[A-Z]+$/.test(str);
}).forEach(str => {
    console.log(str);
})
//What do you thinks about above performance?

// In the process of transforming the array, we’ve iterated arrays three times
// and created two completely new big arrays. This is far from efficient! You
// shouldn’t program this way if you’re concerned about performance or you’re
// dealing with big sequences of items.

//More bettern

let stringObservable = [...10000]
stringObservable.map(str => str.toUpperCase())
    .filter(str => /^[A-Z]+$/.test(str))
    .take(5)
    .subscribe(str => {
        console.log(str);
    })

//     RxJS will do only as much work as necessary. This
// way of operating is called lazy evaluation
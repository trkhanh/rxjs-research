//imperetive - how
arr = [...n]
for (let i = 0; i < arr.length; i++) {
    console.log(i)
}

//declarative - What
arr.forEach(element => {
    console.log(i)
});


if (denTat && buonNgu && met) {
    goToSleep()
}






var observer = function (isSang ? , isNhacBuon ? ) {
    if (!isSang && isNhacBuon) {
        goToSleep()
    }
};

var subject_1 = den;
var subject_2 = radio;


subject_1.subsribe(observer)
subject_2.subsribe(observer)


//state:sang ,toi
subject_1.observers = [` function (isSang?, isNhacBuon?) {
    if (!isSang && isNhacBuon) {
        goToSleep()
    }
};`, ]

//state:nhac buon, nhac vui
subject_2.observers = [`function (isSang ? , isNhacBuon ? ) {
        if (!isSang && isNhacBuon) {
            goToSleep()
        }
    };`]

subject_1.changeStateTo(sang)
subject_1.notifyObserver() {
    this.observers.forEach(observerExecutingWith => {
        observerExecutingWith();
    });
}






var patientInfo = {
    f: function a() {
        updateUI()
    }, //callback
    
}

var subject_1 = patientData;
var observer = patientInfo;


subject_1.subsribe(observer)


//state of S1: active  : emit something.
subject_1.notifyObserver();
subject_1.observers.forEach(
    patientInfo.f()
)
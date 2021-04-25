class Student {
    constructor(name, number){
        this.name = name
        this.number =number
    }
    sayHi() {
        console.log(`姓名：${this.name}, 学号：${this.number}`)
    }
}
const stu = new Student("psg", 10000)
stu.sayHi()
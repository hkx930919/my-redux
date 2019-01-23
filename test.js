function fn(strings, name, age) {
    console.log(11,strings,name,age);
    
    return name + strings[0] + strings[1] + age; // 注意看这里
}
const name = "方方";
const age = 18;

const output = fn`我是${name}，今年${age}`;

console.log(output);

"use strict"

process.stdin.resume()
process.stdin.setEncoding('utf8');
console.log('enter data:');

process.stdin.on('data', function(data) {
    const reverse = data.trim().split("").reverse().join("")
    process.stdout.write(reverse + '\n')
})
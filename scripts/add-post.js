/**
 * add new post command
 * @type {module:fs}
 */
const fs = require('fs');
const path = require('path');

const modulePath = path.resolve(__dirname, '../src/posts/~post-loader.ts');
const postPath = path.resolve(__dirname, '../src/posts');

const postLoader = fs.readFileSync(modulePath);
const posts = fs.readdirSync(postPath)
    .filter(i => /^\[\d{4}](.+)\.md$/.test(i))
    .sort()
    .reverse();

// match -t "Title"
const dashTIndex = process.argv.findIndex(i => i === '-t');
const newPostTitleArg = process.argv[dashTIndex + 1];

if (dashTIndex !== -1) {
    const index = `${posts.length + 1}`.padStart(4, '0');
    const newTitle = `[${index}]${newPostTitleArg.replace(/\\.md$/, '')}.md`;
    fs.writeFileSync(path.join(`${postPath}`, newTitle), '');
    console.log(`add post: ${newTitle}`)
    posts.push(newTitle);
}

const src = postLoader.toString();

// append posts literal
const postExprs = posts.map(name => {
    const id = Number(/^\[(\d{4})/.exec(name)?.[1]);
    const title = name.replace(/^\[\d{4}](.+)\.md$/, '$1');
    return `{ id: ${id}, title: '${title}', fetch: ()=> import('./${name}?raw') }`
}).join(',\n  ')

const injected = src.replace(/\[[\s\S]+(\/\*HERE APPENDS THE POSTS\*\/)/, `[\n${postExprs}\n$1`)

fs.writeFileSync(modulePath, injected);

console.log('done');






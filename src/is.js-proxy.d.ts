// requires npm package @types/is to be istalled
// acts as a proxy
declare var is: Is;

declare module 'is_js' {
    export = is;
}
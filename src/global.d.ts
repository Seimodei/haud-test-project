declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module 'blob' {
	function Blob(): any
	export = Blob
}
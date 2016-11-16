/*
Turn text into a url safe slug
*/
export default function slugify(string) {
  return string.toString()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/\//g, '__') // Replace slashes with __
    /*eslint-disable */
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    /*eslint-enable */
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
    .replace(/^__+/, '') // Trim __ from start of text
    .replace(/__+$/, '') // Trim __ from end of text
}

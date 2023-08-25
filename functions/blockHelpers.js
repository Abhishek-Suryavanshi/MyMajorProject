const hbs = require('hbs');
// const DomParser = require('dom-parser');
// const parser = new DomParser();

module.exports.pagination = hbs.registerHelper('pagination', function (offset, limit) {
    let str = "";
    // console.log(options);
    // console.log(options.hash.offset);
    // console.log(options.hash.limit);
    console.log(offset);
    console.log(limit);
    
    offset.map((element, indx) => {
        str += `<a href="/shop/products-list?limit=${limit}&offset=${element}">${indx + 1}</a>`;
    });

    // const html = parser.parseFromString(str, 'text/html');
    // console.log(html.rawHTML);

    return str;
});

// module.exports.pagination = hbs.registerHelper('pagination', function (offset, limit) {
//     let str = "";

//     let link_1 = "<a href=";
//     let link_2 = "/shop/products-list?limit=";
//     let link_3 = "&offset=";
//     let link_4 = ">";
//     let link_5 = "</a>";

//     offset.forEach((element, indx) => {
//         str += link_1 + link_2 + limit + link_3 + element + link_4 + indx + link_5;
//     });

//     // const html = parser.parseFromString(str, 'text/html');
//     // console.log(html.rawHTML);
//     // return html.rawHTML;

//     return "<div>" + str + "</div>";
// });
var ex2 = require('../node/ex2.js');

exports.testEx2 = function(test){
    test.expect(3);
    test.equal(ex2.ex2.p(), 'p');
    test.equal(ex2.ex21, 'ex21ex11');
    test.equal(ex2.ex11(), 'ex11');
    test.done();
};

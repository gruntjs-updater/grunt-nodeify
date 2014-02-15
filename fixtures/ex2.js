var ex2 = {
    func: function(){
        return 'func';
    },

    p: function(){
        return ex1.p();
    }
};

var ex21 = 'ex21' + ex11();

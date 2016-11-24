

function Command(roots){
    this.roots = roots
}

//  Return the first root by which this command can be invoked
Command.prototype.primary = function(){
    return this.roots[0];
}



exports = module.exports = Command;




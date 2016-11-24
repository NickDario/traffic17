var cmd = require('./command')

cmd1 = new cmd({
    test:'testing'
});

cmd2 = new cmd({
    test:'two commands'
});

cmd1.echo();
cmd2.echo();



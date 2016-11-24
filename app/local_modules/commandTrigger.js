var cmd = require('./commands');


function TriggerCommand()
{
}

//TriggerCommand.constructor = TriggerCommand;
TriggerCommand.prototype = cmd.prototype;

return TriggerCommand;


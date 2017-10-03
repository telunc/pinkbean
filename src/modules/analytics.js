import ua from 'universal-analytics';

export default (action, message) => {

    let visitor = ua('UA-91359269-3', message.author.id, { strictCidFormat: false });
    let label = (message.guild) ? `Guild: ${message.guild.name} ${message.guild.id}`: `User: ${message.author.username}`;
    let params = { ec: 'Maple', ea: action, el: label };

    visitor.event(params).send();

};
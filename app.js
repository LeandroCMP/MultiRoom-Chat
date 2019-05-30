/* importar as configs do server */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log("Server On");
});

var io = require('socket.io').listen(server);
app.set('io', io);

/* criar uma conexão por websocket */
io.on('connection', function(socket){
	console.log("Usuário Conectou");

	socket.on('disconnect', function(){
		console.log('Desconectado');
	});

	socket.on('msgParaServidor', function(data){
		socket.emit(
			'msgParaCliente',
			 {apelido: data.apelido, 
			 	mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente',
			 {apelido: data.apelido, 
			 	mensagem: data.mensagem}
		);

		if(parseInt(data.apelido_atulizado) == 0){
		socket.emit(
			'participantesParaCliente',
			 {apelido: data.apelido}
		);

		socket.broadcast.emit(
			'participantesParaCliente',
			 {apelido: data.apelido}
		);
		}
	});
});
describe('Control', function () {
	describe('#revisarTexto', function () {
		it('checks the test text', function () {
			var texto = window.MiApp.agarrarTexto();

			expect(texto).to.equal('test');
		});
	});
});


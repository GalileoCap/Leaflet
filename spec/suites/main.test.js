describe('Control', function () {
	describe('#revisarTexto', function () {
		it('tiene qe fallar', function () {
			var texto = window.MiApp.agarrarTexto();

			expect(texto).to.equal('test');
		});
		it('tiene qe andar', function () {
			var texto = window.MiApp.agarrarTexto("anda");

			expect(texto).to.equal('test');
		});
	});
});


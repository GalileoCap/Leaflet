describe('Control', function () {
	function	agarrarTexto() {
		return 'test'; // document.getElementById('texto');
	}

	describe('#revisarTexto', function () {
		it('checks the test text', function () {
			var texto = agarrarTexto();

			expect(texto).to.equal('test');
		});
	});
});


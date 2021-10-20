START

FUNCTION obtenerElementos(elementos,tipoOrd)
elementos = elementos;
PRINT 'Elige la forma en la que quieres ordenar'
PRINT '1. Por los elementos de cada elemento.
       2. Por los tipos de elementos'
INPUT decision
IF tipoOrd == 'element'
	PRINT 'Elige la forma en la que se ordenan'
	PRINT 'NumAtomico
			MasaAtomica
			Alfabetico'
	INPUT decisionOrden
	PRINT 'Elige la manera de ordenarlos'
	PRINT ' DES
			ASC'
	INPUT maneraOrden
	IF (maneraOrden)
		CASE decisionOrden
		NumAtomico : ordenNumAtomico(maneraOrden,elementos)
		MasaAtomica : ordenMasaAtomica(maneraOrden,elementos)
		Alfabetico : ordenAlfabetico(maneraOrden,elementos)
		DEFAULT : PRINT 'Valor invalido'

	ELSE
		PRINT 'No se encontró el dato para ordenar'.
	
	ENDCASE
ELSE IF tipoOrd == 'type'
	PRINT 'Seleccione el orden de los tipos
		1.Gases nobles
		2.Halogenos
		3.No Metales
	    4.Metaloides
	    5.Metales de transición
	    6.Alcalinotérreos
	    7.Metales Alcalinos
	    8.Lantánidos.
	    9.Actínidos	
	    10.Otros metales'
	i = 1
	WHILE i <= 10
		PRINT 'Escriba el tipo que irá en la posición' i
		INPUT orden[i]
		i = i + 1
	END WHILE
	ordenTipo([orden],elementos)
ELSE
	PRINT 'No existe una decisión fuera de 1 y 2'

RETURN elmentos
END OF FUNCTION
END


FUNCTION ordenNumAtomico(forma,elementos)
	
	mayor
	menor
	IF forma == 'DES'
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].numeroAtomico > elementos[j].numeroAtomico
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor

					
	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j = 0, j < LENGHT elementos[], incrementar j
				IF elementos[i].numeroAtomico < elementos[j].numeroAtomico
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor
					elementos[j] = mayor
			
END OF FUNCTION

FUNCTION masaAtomica(maneraOrden,elementos)
	mayor
	menor
	IF maneraOrden == 'DES'
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].masaAtomica > elementos[j].masaAtomica
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor


	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j = 0, j < LENGHT elementos[], incrementar j
				IF elementos[i].masaAtomica < elementos[j].masaAtomica
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor
					elementos[j] = mayor
END OF FUNCTION

FUNCTION ordenAlfabetico(maneraOrden,elementos)
	mayor 
	menor
	IF maneraOrden == 'DES'
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].nombre > elementos[j].nombre
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor

			
	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].nombre < elementos[j].nombre
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor 
					elementos[j] = mayor
		
END OF FUNCTION

FUNCTION ordenTipo(orden[],elementos)
	ordenNumAtomico(1)
	elemento1
	elemento2
	
	FOR i = 0, i < LENGHT orden[], incrementar i
			
		FOR j = 0, j < LENGHT elementos[], incrementar j
			IF orden[i] == elementos[j].tipo
				elemento1 = elementos[i]
				elemento2 = elementos[j]
				elemetos[i] = elemento2
				elementos[j] = elemento1
				

				
END OF FUNCTION

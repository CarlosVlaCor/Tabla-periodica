START
elementos[]
FUNCTION ordenamiento()
PRINT 'Elige la forma en la que quieres ordenar'
PRINT '1. Por los elementos de cada elemento.
       2. Por los tipos de elementos'
INPUT decision
IF decision == 1
	PRINT 'Elige la forma en la que se ordenan'
	PRINT ' 1. Por número atómico
		2. Masa atómica
		3. Por orden alfabético'
	INPUT decisionOrden
	PRINT 'Elige la manera de ordenarlos'
	PRINT ' 1.Manera ascendente
		2.Manera descendente'
	INPUT maneraOrden
	IF maneraOrden == 1
		CASE decisionOrden
		1 : ordenNumAtomico(maneraOrden)
		2 : masaAtomica(maneraOrden)
		3 : ordenAlfabetico(maneraOrden)
		DEFAULT : PRINT 'Valor invalido'
	ELSE IF maneraOrden == 2
		CASE decisionOrden
		1 : ordenNumAtomico(maneraOrden)
		2 : masaAtomica(maneraOrden)
		3 : ordenAlfabetico(maneraOrden)
		4 : ordenPeriodo(maneraOrden)
		5 : ordenGrupo(maneraOrden)
		DEFAULT : PRINT 'Valor invalido'
	ELSE
		PRINT 'Solo se puede elegir entre 1 y 2'
	
	ENDCASE
ELSE IF decision == 2
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

ELSE
	PRINT 'No existe una decisión fuera de 1 y 2'

END OF FUNCTION
END


FUNCTION ordenNumAtomico(maneraOrden)
	
	mayor
	menor
	IF maneraOrden == 1
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].numeroAtomico > elementos[j].numeroAtomico
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor
					elementos[j] = mayor

					
	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j = 0, j < LENGHT elementos[], incrementar j
				IF elementos[i].numeroAtomico < elementos[j].numeroAtomico
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor
			
END OF FUNCTION

FUNCTION masaAtomica(maneraOrden)
	mayor
	menor
	IF maneraOrden == 1
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].masaAtomica > elementos[j].masaAtomica
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor
					elementos[j] = mayor


	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j = 0, j < LENGHT elementos[], incrementar j
				IF elementos[i].masaAtomica < elementos[j].masaAtomica
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor
END OF FUNCTION

FUNCTION ordenAlfabetico(maneraOrden)
	mayor 
	menor
	IF maneraOrden == 1
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].nombre > elementos[j].nombre
					mayor = elementos[i]
					menor = elementos[j]
					elementos[i] = menor
					elementos[j] = mayor

			
	ELSE
		FOR i = 0, i < LENGHT elementos[], incrementar i
			j = i + 1
			FOR j , j < LENGHT elementos[], incrementar j
				IF elementos[i].nombre < elementos[j].nombre
					menor = elementos[i]
					mayor = elementos[j]
					elementos[i] = mayor
					elementos[j] = menor
		
END OF FUNCTION

FUNCTION ordenTipo(orden[])
	ordenNumAtomico(1)
	elemento1
	elemento2
	indice = 0
	FOR i = 0, i < LENGHT orden[], incrementar i
			
		FOR j = 0, j < LENGHT elementos[], incrementar j
			IF orden[i] == elementos[j].tipo
				elemento1 = elementos[indice]
				elemento2 = elementos[j]
				elemetos[indice] = elemento2
				elementos[j] = elemento1
				indice = indice + 1

				
END OF FUNCTION

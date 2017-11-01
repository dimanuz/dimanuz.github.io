
class Cells {
	constructor(name) {
		this.cells="." + name;
		this.TotalCols = 4; //количество столбцов
		this.TotalRows = 4; //количество рядов
		this.SelectedCol = -1; //выбранный столбец
		this.SelectedRow = -1; //выбранный ряд 
		this.CreateCells();

		this.cells__table = document.querySelector(this.cells+" .cells__table");
		this.cells__add_columm_button = document.querySelector(this.cells+" .cells__add_columm_button");
		this.cells__add_row_button = document.querySelector(this.cells+" .cells__add_row_button");
		this.cells__delete_column_button = document.querySelector(this.cells+" .cells__delete_column_button");
		this.cells__delete_row_button = document.querySelector(this.cells+" .cells__delete_row_button");
		
		this.AddListners();		
	}

	CreateCells(){
		var td=`<td class = "cells__td"></td>`;
		var tr=`<tr>`+td+td+td+td+`</tr>`;

		document.querySelector(this.cells).innerHTML=`
			<table class = "cells__table">`+tr+tr+tr+tr+
			`</table>
				<button class = "cells__add_columm_button">+</button>
				<button class = "cells__delete_row_button">-</button>
				<button class = "cells__delete_column_button">-</button>
				<button class = "cells__add_row_button">+</button>
			`;
	}
	
	AddListners(){
		//навешиваем обработчики клика и положения мышки
		this.cells__table.addEventListener('mouseover', this.MouseOverCells.bind(this));
		this.cells__table.addEventListener('mouseout', this.MouseOutCells.bind(this));

		this.cells__add_columm_button.addEventListener('click', this.AddCol.bind(this));
		this.cells__add_row_button.addEventListener('click', this.AddRow.bind(this));

		this.cells__delete_column_button.addEventListener('click', this.RemoveCol.bind(this));
		this.cells__delete_column_button.addEventListener('mouseover', this.SetEnabledColDeleteButton.bind(this));
		this.cells__delete_column_button.addEventListener('mouseout', this.SetDisabledColDeleteButton.bind(this));

		this.cells__delete_row_button.addEventListener('click', this.RemoveRow.bind(this));
		this.cells__delete_row_button.addEventListener('mouseover', this.SetEnabledRowDeleteButton.bind(this));
		this.cells__delete_row_button.addEventListener('mouseout', this.SetDisabledRowDeleteButton.bind(this));
	}	
	
	MouseOutCells(event) {
		//Мышь вне таблицы
		this.SetDisabledRowDeleteButton();
		this.SetDisabledColDeleteButton();		
	}	

	
	MouseOverCells(event) {
		//мышь на таблице
		this.SelectedRow=event.target.parentElement.rowIndex;
		this.SelectedCol=event.target.cellIndex;

		this.SetEnabledRowDeleteButton();
		this.SetEnabledColDeleteButton();

		this.MoveDeleteRowButton();
		this.MoveDeleteColButton();
	}	

	SetEnabledRowDeleteButton(){
		if (this.TotalRows>1) 
			this.cells__delete_row_button.classList.add('cells__delete_row_button-enabled');
	}

	SetEnabledColDeleteButton(){
		if (this.TotalCols>1) 
			this.cells__delete_column_button.classList.add('cells__delete_column_button-enabled');
	}

	SetDisabledColDeleteButton(){
		this.cells__delete_column_button.classList.remove('cells__delete_column_button-enabled');
 	}

	SetDisabledRowDeleteButton(){
		this.cells__delete_row_button.classList.remove('cells__delete_row_button-enabled');
 	}
	
	MoveDeleteRowButton() {
		this.cells__delete_row_button.style.top=60+this.SelectedRow*52+"px";
	}
	
	MoveDeleteColButton() {
		this.cells__delete_column_button.style.left=60+this.SelectedCol*52+"px";
	}

	RemoveCol(c) {
		for (var r = 0; r < this.TotalRows; r++)
			this.cells__table.rows[r].deleteCell(this.SelectedRow);
		
		this.TotalCols-=1;			
		this.cells__delete_column_button.classList.remove('cells__delete_column_button-enabled');
	}
	
	RemoveRow(r) {
		this.cells__table.deleteRow(this.SelectedRow);

		this.TotalRows-=1;
		this.cells__delete_row_button.classList.remove('cells__delete_row_button-enabled');
	}
	
	AddCol() {
		for (var r = 0; r < this.TotalRows; r++){
			this.cells__table.rows[r].insertCell(this.TotalCols);
			this.cells__table.rows[r].cells[this.TotalCols].classList.add('cells__td');
		}
		this.TotalCols+=1;	
	}
	
	AddRow() {
		var newrow = this.cells__table.insertRow(this.TotalRows);

		for (var c = 0; c < this.TotalCols; c++) {
			newrow.insertCell(-1);
			newrow.cells[c].classList.add('cells__td');
		}
		this.TotalRows+=1;	
	}
}


window.onload = function(){

	var cells  = new Cells('cells');	
	var cells1 = new Cells('cells1');	
}

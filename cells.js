
class Cells {
    constructor(DOMCell, TotalCols, TotalRows) {
        this.cells=DOMCell;
        this.TotalCols = TotalCols; //количество столбцов
        this.TotalRows = TotalRows; //количество рядов
        this.SelectedCol = -1; //выбранный столбец
        this.SelectedRow = -1; //выбранный ряд
        this.CreateHTMLCells();

        this.cells__table = DOMCell.querySelector(".cells__table");
        this.cells__add_columm_button = DOMCell.querySelector(".cells__add_columm_button");
        this.cells__add_row_button = DOMCell.querySelector(".cells__add_row_button");
        this.cells__delete_column_button = DOMCell.querySelector(".cells__delete_column_button");
        this.cells__delete_row_button = DOMCell.querySelector(".cells__delete_row_button");

        this.AddListners();
    }

    CreateHTMLCells(){
        var td = `<td class = "cells__td"></td>`;
        var tr = `<tr>`;

        for (var i=0; i < this.TotalCols; i++) tr += td;

        tr += `</tr>`;
        var table = `<table class = "cells__table">`;

        for (i=0; i < this.TotalRows; i++) table += tr;

        this.cells.innerHTML = table +
            `</table>
				<button class = "cells__buttons cells__add_button cells__add_columm_button"><i class="fa fa-plus"></i></button>
				<button class = "cells__buttons cells__delete_button cells__delete_row_button"><i class="fa fa-minus"></i></button>
				<button class = "cells__buttons cells__delete_button cells__delete_column_button"><i class="fa fa-minus"></i></button>
				<button class = "cells__buttons cells__add_button cells__add_row_button"><i class="fa fa-plus"></i></button>
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

    MouseOutCells() {
        //Мышь вне таблицы
        this.SetDisabledRowDeleteButton();
        this.SetDisabledColDeleteButton();
    }

    MouseOverCells(event) {
        //мышь на таблице
        if (event.target.classList.contains("cells__td")) {
            this.SelectedRow=event.target.parentElement.rowIndex;
            this.SelectedCol=event.target.cellIndex;

            this.SetEnabledRowDeleteButton();
            this.SetEnabledColDeleteButton();

            this.MoveDeleteRowButton(event.layerY-event.offsetY);
            this.MoveDeleteColButton(event.layerX-event.offsetX);
        }
    }

    SetEnabledRowDeleteButton() {
        if (this.TotalRows > 1)
            this.cells__delete_row_button.classList.add('cells__button-enabled');
    }

    SetEnabledColDeleteButton() {
        if (this.TotalCols > 1)
            this.cells__delete_column_button.classList.add('cells__button-enabled');
    }

    SetDisabledColDeleteButton() {
        this.cells__delete_column_button.classList.remove('cells__button-enabled');
    }

    SetDisabledRowDeleteButton() {
        this.cells__delete_row_button.classList.remove('cells__button-enabled');
    }

    MoveDeleteRowButton(offsetTop) {
        this.cells__delete_row_button.style.top=offsetTop+"px";
    }

    MoveDeleteColButton(offsetLeft) {
        this.cells__delete_column_button.style.left=offsetLeft+"px";
    }

    RemoveCol() {
        for (var r = 0; r < this.TotalRows; r++) {
            this.cells__table.rows[r].deleteCell(this.SelectedCol);
        }
        this.TotalCols -= 1;

        this.SetDisabledColDeleteButton();
     }

    RemoveRow() {
        this.cells__table.deleteRow(this.SelectedRow);

        this.TotalRows -= 1;
        this.SetDisabledRowDeleteButton();
    }

    AddCol() {
        for (var r = 0; r < this.TotalRows; r++){
            this.cells__table.rows[r].insertCell(this.TotalCols);
            this.cells__table.rows[r].cells[this.TotalCols].classList.add('cells__td');
        }
        this.TotalCols += 1;
    }

    AddRow() {
        var newrow = this.cells__table.insertRow(this.TotalRows);

        for (var c = 0; c < this.TotalCols; c++) {
            newrow.insertCell(-1);
            newrow.cells[c].classList.add('cells__td');
        }
        this.TotalRows += 1;
    }
}

window.onload = function(){
    var TotalCols = 5; //количество столбцов
    var TotalRows = 5; //количество рядов
    var DOMCells = document.querySelectorAll(".cells");

    for ( var i = 0; i < DOMCells.length; i++) {
        new Cells(DOMCells[i], TotalCols, TotalRows);
    }

};

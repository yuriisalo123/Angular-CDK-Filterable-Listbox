import { CdkListbox, ListboxValueChangeEvent } from '@angular/cdk/listbox';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  Pipe,
  PipeTransform,
  OnChanges,
} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'listbox',
  templateUrl: './listbox.html',
  styleUrls: ['./listbox.css'],
})
export class ListboxComponent implements OnChanges {
  @Input() options: Z2SelectListBoxOptions[] = [
       {
      id: 'one',
      name: 'one',
    },
     {
      id: 'two',
      name: 'two',
    },
     {
      id: 'three',
      name: 'three',
    },
     {
      id: 'four',
      name: 'four',
    },
  ];
  @Input() selectedOptions: string[] = [];

  @Output() selected = new EventEmitter<any>();

  @ViewChild('listbox', { static: true, read: CdkListbox })
  private lb?: CdkListbox<string>;

  filteredOptions: Z2SelectListBoxOptions[] = this.options;

  filterText = '';
  searchTextChanged = new Subject<string>();

  constructor() {
    this.searchTextChanged
      .pipe(
        debounceTime(100), // wait 500ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe((value) => {
        this.filterList();
      });
  }

  isSelected(id: string) {
    return this.lb?.isValueSelected(id);
  }

  onChange(option: ListboxValueChangeEvent<any>) {
    this.selected.emit(option.value);
    if (this.filterText == '') {
      this.selectedOptions = [];
    }
    option.value.forEach((element: any) => {
      this.selectedOptions.push(element);
    });
  }

  onFilterChange(filterText: string) {
    this.searchTextChanged.next(filterText);
  }

  ngOnChanges() {
    this.filterList();
  }

  private filterList() {
    if (this.filterText == '') {
      this.filteredOptions = this.options;
      return;
    }
    this.filteredOptions = this.options.filter((option) => {
      return option.name.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

  toggleSelectAll() {
    if (this.filteredOptions.length == this.getSelected().length) {
    } else {
      this.lb?.setAllSelected(true);
    }
  }

  getSelected() {
    return this.lb?.value ?? [];
  }

  setSelected() {}

  clearFilter() {
    this.filterText = '';
    this.filterList();
  }
}

export type Z2SelectListBoxOptions = {
  id: string;
  name: string;
};

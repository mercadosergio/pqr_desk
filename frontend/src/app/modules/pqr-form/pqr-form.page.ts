import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICreatePqrDto, IPqrForm } from '../../shared/models/interfaces/pqr.interface';
import { channels, priorities, statuses, types } from '../../core/mapping-objects';
import { PqrService } from '../../core/services/pqr.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-pqr-form',
  styleUrl: './pqr-form.page.css',
  templateUrl: './pqr-form.page.html',
})
export default class PqrFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private pqrService = inject(PqrService);
  private toastService = inject(ToastService);

  pqrForm!: FormGroup<IPqrForm>;
  types = types;
  priorities = priorities;
  statuses = statuses;
  channels = channels;

  ngOnInit(): void {
    this.pqrForm = this.fb.nonNullable.group({
      type: [types[0].value],
      title: [''],
      description: [''],
      category: [''],
      priority: [priorities[0].value],
      status: [statuses[0].value],
      channel: [channels[0].value],
    });
  }

  createPqr() {
    if (this.pqrForm.invalid) {
      this.pqrForm.markAllAsTouched();
      this.toastService.show('Completa los campos requeridos.', 'warning');
      return;
    }

    this.pqrService.createPqr(this.currentPqr).subscribe({
      next: (data) => {
        this.pqrForm.reset();
        this.toastService.show(`PQR #${data.id} creada correctamente.`);
      },
      error: () => {
        this.toastService.show('No fue posible crear la PQR.', 'error');
      },
    });
  }

  get currentPqr(): ICreatePqrDto {
    return {
      client_id: 1,
      type: this.pqrForm.controls.type.value,
      title: this.pqrForm.controls.title.value,
      description: this.pqrForm.controls.description.value,
      category: this.pqrForm.controls.category.value,
      priority: this.pqrForm.controls.priority.value,
      status: this.pqrForm.controls.status.value,
      channel: this.pqrForm.controls.channel.value,
    };
  }
}

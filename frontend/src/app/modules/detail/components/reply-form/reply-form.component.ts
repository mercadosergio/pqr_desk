import { Component, inject, input, output } from '@angular/core';
import { IPqr } from '../../../../shared/models/interfaces/pqr.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ICreateCommentDto,
  IFormComment,
} from '../../../../shared/models/interfaces/comments.interface';
import { CommentsService } from '../../../../core/services/comments.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reply-form',
  styleUrl: './reply-form.component.css',
  templateUrl: './reply-form.component.html',
})
export class ReplyFormComponent {
  pqr = input.required<IPqr>();
  reloadDetail = output<void>();

  private fb = inject(FormBuilder);
  private commentService = inject(CommentsService);
  private toastService = inject(ToastService);

  replyForm!: FormGroup<IFormComment>;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.replyForm = this.fb.nonNullable.group({
      description: [''],
      action_type: ['email'],
    });
  }

  submit() {
    if (this.replyForm.invalid || !this.currentComent.description.trim()) {
      this.toastService.show('Escribe una respuesta antes de enviarla.', 'warning');
      return;
    }

    this.commentService.createComment(this.pqr().id, this.currentComent).subscribe({
      next: () => {
        this.toastService.show('Respuesta enviada correctamente.');
        this.replyForm.reset({ action_type: 'email', description: '' });
        this.reloadDetail.emit();
      },
      error: () => {
        this.toastService.show('No fue posible enviar la respuesta.', 'error');
      },
    });
  }

  get currentComent(): ICreateCommentDto {
    return {
      description: this.replyForm.controls.description.value,
      action_type: this.replyForm.controls.action_type.value,
    };
  }
}

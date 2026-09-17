import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PqrPriority, PqrStatus } from '../../shared/models/interfaces/pqr.interface';
import { PqrService } from '../../core/services/pqr.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { TimeDistancePipe } from '../../core/pipes/time-distance-pipe';

@Component({
  imports: [RouterLink, FontAwesomeModule, TimeDistancePipe],
  selector: 'app-detail',
  styleUrl: './detail.page.css',
  templateUrl: './detail.page.html',
})
export default class DetailPage {
  faEnvelope = faEnvelope;
  id = input.required<number>();

  ticket = {
    id: 1048,
    title: 'No puedo acceder a mi factura de abril',
    description:
      'Hola, intento descargar la factura de abril desde el portal, pero el botón no responde y aparece un mensaje de error. ¿Podrían ayudarme a obtenerla?',
    client: {
      name: 'Mariana López',
      email: 'mariana.lopez@email.com',
      phone: '+57 300 456 7890',
      dni: '1.025.456.789',
    },
    category: 'Facturación',
    channel: 'Email',
    priority: 'high' as PqrPriority,
    status: 'in_progress' as PqrStatus,
    createdAt: '16 de septiembre de 2026, 9:42 a. m.',
    updatedAt: 'Hace 18 minutos',
  };

  statusOptions: { label: string; value: PqrStatus }[] = [
    { label: 'Recibida', value: 'received' },
    { label: 'En gestión', value: 'in_progress' },
    { label: 'Resuelta', value: 'resolved' },
    { label: 'Cerrada', value: 'closed' },
  ];

  private pqrService = inject(PqrService);

  rxPqr = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.pqrService.getOnePqr(params),
  });
}

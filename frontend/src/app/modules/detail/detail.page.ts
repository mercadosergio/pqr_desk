import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PqrPriority, PqrStatus } from '../../shared/models/interfaces/pqr.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-detail',
  styleUrl: './detail.page.css',
  templateUrl: './detail.page.html',
})
export default class DetailPage {
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
}

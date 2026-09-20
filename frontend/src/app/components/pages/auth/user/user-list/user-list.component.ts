import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../../../shared/models/user.models';
import { UPLOAD_IMAGE_URL } from '../../../../../shared/constants/urls';
import { UserService } from '../../../../../services/user.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-user-list',
  styleUrl: './user-list.component.css',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  UPLOAD_IMAGE_URL = UPLOAD_IMAGE_URL + 'users/';
  page = 1;
  totalPages = 1;
  userOn!: User;

  users: User[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((newUser) => {
      if (newUser) {
        this.userOn = newUser;
        this.loadUsers();
      }
    });
  }

  loadUsers(): void {
    this.userService.getUserPaginated(this.page).subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      },
    });
  }

  changeUserRole(user: User, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newRole = Number(select.value);

    if (newRole === user.UsuNivAce) {
      return;
    }

    this.userService.updateUserRole(user._id!, newRole).subscribe({
      next: (updatedUser) => {
        user.UsuNivAce = updatedUser.UsuNivAce;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao alterar cargo do usuário:', error);
        select.value = String(user.UsuNivAce);
      },
    });
  }

  // Pagination properties
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}

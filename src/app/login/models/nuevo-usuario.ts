export class NuevoUsuario {
  nombre: string;
  identificacion: string;
  apellido: string;
  telefono: string;
  correo: string;
  clave: string;
  estado: string;
  roles: string[];

  constructor(nombre: string, identificacion: string, apellido: string, telefono: string, correo: string, clave: string, estado: string, roles: string[]) {
    this.nombre = nombre;
    this.identificacion = identificacion;
    this.apellido = apellido;
    this.telefono = telefono;
    this.correo = correo;
    this.clave = clave;
    this.estado = estado;
    this.roles = roles;
  }
}

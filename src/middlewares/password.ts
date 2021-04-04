import bcrypt from 'bcrypt';

export async function encriptar(contrasena: string){
    let salto = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(contrasena, salto)
    return hash
}

export async function compararContrasenaLogin(contrasena: string, compaContrasea: string) {
    let band: boolean = await bcrypt.compare(contrasena, compaContrasea)
    return band
}
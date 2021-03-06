/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconeAtencao } from "../components/icons";
import useAuth from "../data/hook/useAuthData";

export default function Autenticacao() {

    const { cadastrar, login, loginGoogle } = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmada, setSenhaConfirmada] = useState('')

    function exibirErro(msg, tempoEmSegundos = 5) {
        setErro(msg)
        setTimeout(() => {
            setErro(null)
        }, tempoEmSegundos * 1000)
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else if (senha === senhaConfirmada) {
                await cadastrar(email, senha)
            } else {
                exibirErro('Confirmação de senha inválida')
            }
        } catch (e) {
            exibirErro(e?.message ?? 'Erro desconhecido')
        }
    }

    async function submeterGoogle() {
        try {
            await loginGoogle()
        } catch (e) {
            exibirErro(e?.message ?? 'Erro desconhecido')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w=1/2 lg:w-2/3">
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem da Tela de Autenticacao"
                    className="h-screen w-full object-cover"
                />
            </div>
            <div className={`
                md:w-1/2 w-full m-10 lg:w-1/3
            `}>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {modo === 'login' ?
                        'Entre com a sua Conta' :
                        'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={`
                    flex items-center
                    bg-red-400 text-white py-3 px-5 my-2
                    border border-red-700 rounded-lg
                `}>
                        {IconeAtencao()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : false
                }
                <AuthInput
                    label="Email"
                    tipo='email'
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput
                    label="Senha"
                    tipo='password'
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />

                <AuthInput
                    label="Confirmar Senha"
                    tipo='password'
                    valor={senhaConfirmada}
                    valorMudou={setSenhaConfirmada}
                    obrigatorio
                />

                <button onClick={submeter} className={`
                    w-full bg-indigo-500 hover:bg-indigo-400
                    text-white rounded-lg px-4 py-3 mt-6
                `}>
                    {modo === 'login' ?
                        'Entrar' :
                        'Cadastrar'}
                </button>
                <hr className="my-6 border-gray-300 w-full" />
                <button onClick={submeterGoogle} className={`
                    flex justify-center align-middle  w-full bg-red-500 hover:bg-red-400
                    text-white rounded-lg px-4 py-3
                `}>
                        <img src="/images/gmail.png" alt="" className="h-8 w-8"/>
                        <span className="mt-1 ml-2">Login Gmail</span>
                </button>

                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer ml-1
                        `}>
                            <div>Crie uma Conta Gratuitamente</div>
                        </a>
                    </p>
                ) :
                    (
                        <p className="mt-8">
                            Já faz parte da nossa comunidade?
                            <a onClick={() => setModo('login')} className={`
                            text-blue-500 hover:text-blue-700 font-semibold
                            cursor-pointer ml-1
                        `}>
                                <div>Entre com as suas Credenciais</div>
                            </a>
                        </p>
                    )

                }
            </div>
        </div>
    )
}
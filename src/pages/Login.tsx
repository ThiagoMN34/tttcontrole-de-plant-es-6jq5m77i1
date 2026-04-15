import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const { signIn, resetPasswordForEmail } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await signIn(email, password)
    setIsSubmitting(false)

    if (error) {
      toast({ title: 'Erro', description: 'Credenciais inválidas.', variant: 'destructive' })
    } else {
      navigate('/')
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: 'Erro',
        description: 'Informe seu email para recuperar a senha.',
        variant: 'destructive',
      })
      return
    }
    setIsSubmitting(true)
    const { error } = await resetPasswordForEmail(email)
    setIsSubmitting(false)

    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o email.',
        variant: 'destructive',
      })
    } else {
      toast({ title: 'Sucesso', description: 'Link de acesso temporário enviado para seu email!' })
      setIsForgotPassword(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-3 pb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Acesso ao Sistema</CardTitle>
          <CardDescription>Entre com suas credenciais de gestor</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            {!isForgotPassword && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Senha</Label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueci a senha
                  </button>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
            )}

            {isForgotPassword ? (
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  type="button"
                  onClick={handleForgot}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Link de Acesso'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsForgotPassword(false)}
                  className="w-full"
                >
                  Voltar ao Login
                </Button>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

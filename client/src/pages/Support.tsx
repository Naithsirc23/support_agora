import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, User, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * DESIGN PHILOSOPHY: Bosque Encantado (Enchanted Forest)
 * 
 * Estética Studio Ghibli con tonos verdes suaves, bordes redondeados y atmósfera de calma.
 * - Paleta: Verdes sage/pistacho sobre fondo blanco cremoso
 * - Tipografía: Playfair Display (títulos elegantes) + Inter (cuerpo legible)
 * - Formas: Bordes redondeados suaves (2rem), espacios generosos
 * - Animaciones: Transiciones suaves (300-500ms), efectos delicados
 * - Interacción: Hover con elevación sutil, feedback visual minimalista
 */

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Support() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Validación básica del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del cambio en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage('Por favor corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envío del formulario (reemplazar con API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aquí iría la llamada a tu API
      // const response = await fetch('/api/support', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitStatus('success');
      setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
      setFormData({ name: '', email: '', message: '' });

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Hubo un error al enviar tu mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header decorativo */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-border/30">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Centro de Soporte Agora
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estamos aquí para ayudarte. Envíanos tu consulta y nos pondremos en contacto lo antes posible.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Tarjeta del formulario */}
          <div className="bg-card border border-border/40 rounded-3xl shadow-lg shadow-primary/5 p-8 md:p-12 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nombre */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 font-sans text-base placeholder-muted-foreground/50 focus:outline-none ${
                    errors.name
                      ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                      : 'border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Campo Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 font-sans text-base placeholder-muted-foreground/50 focus:outline-none ${
                    errors.email
                      ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                      : 'border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo Mensaje */}
              <div className="space-y-2">
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-300 font-sans text-base placeholder-muted-foreground/50 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                      : 'border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Mensaje de estado */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700">{submitMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{submitMessage}</p>
                </div>
              )}

              {/* Botón de envío */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-2xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </span>
                ) : (
                  'Enviar Mensaje'
                )}
              </Button>
            </form>
          </div>

          {/* Información adicional */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: 'Email',
                description: 'support@agora.app',
              },
              {
                icon: MessageSquare,
                title: 'Respuesta Rápida',
                description: 'Respondemos en 24 horas',
              },
              {
                icon: User,
                title: 'Equipo Dedicado',
                description: 'Expertos listos para ayudarte',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border/40 rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pie de página decorativo */}
      <div className="border-t border-border/30 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Agora Support. Estamos aquí para ti.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Mail, Code, MessageCircle, ChevronDown, Send } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslation } from "react-i18next"
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useForm } from "react-hook-form";
type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
  "h-captcha-response": string;
};
export default function Page() {
  const { t } = useTranslation()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>();

  const onValid = (_data: ContactFields, e?: React.BaseSyntheticEvent) => {
    (e?.target as HTMLFormElement).submit();   
  };
  const onHCaptchaChange = (token: string) => {
    setValue("h-captcha-response", token);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-slate-800 dark:text-slate-200">{t("about.name")}</div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex space-x-6">
                <a
                  href="#about"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {t("nav.about")}
                </a>
                <a
                  href="#services"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {t("nav.services")}
                </a>
                <a
                  href="#projects"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {t("nav.projects")}
                </a>
                <a
                  href="#contact"
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {t("nav.contact")}
                </a>
              </div>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{t("hero.description")}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href="#contact">
                    <Mail className="w-4 h-4 mr-2" />
                    {t("hero.getInTouch")}
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#projects">
                    <Code className="w-4 h-4 mr-2" />
                    {t("hero.viewProjects")}
                  </a>
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://github.com/nikbr" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://hh.ru/resume/454fde6cff0d17cc570039ed1f4f7774527152" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/images/hh.png"
                      alt="HeadHunter"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20 scale-110"></div>
                <Image
                  src="/images/profile.png"
                  alt="Professional headshot"
                  width={400}
                  height={500}
                  className="relative rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a href="#about" className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t("about.title")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="prose prose-lg mx-auto text-slate-600 dark:text-slate-300">
            <p className="text-center leading-relaxed">{t("about.paragraph1")}</p>
            <p className="text-center leading-relaxed mt-6">{t("about.paragraph2")}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t("services.title")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl dark:text-slate-100">{t("services.webDev.title")}</CardTitle>
                <CardDescription className="text-base dark:text-slate-300">
                  {t("services.webDev.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {t("services.webDev.item1")}</li>
                  <li>• {t("services.webDev.item2")}</li>
                  <li>• {t("services.webDev.item3")}</li>
                  <li>• {t("services.webDev.item4")}</li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                  <Badge variant="secondary">Flask</Badge>
                  <Badge variant="secondary">.NET</Badge>
                  <Badge variant="secondary">MySQL</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl dark:text-slate-100">{t("services.english.title")}</CardTitle>
                <CardDescription className="text-base dark:text-slate-300">
                  {t("services.english.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• {t("services.english.item1")}</li>
                  <li>• {t("services.english.item2")}</li>
                  <li>• {t("services.english.item3")}</li>
                  <li>• {t("services.english.item4")}</li>
                  <li>• {t("services.english.item5")}</li>
                  <li>• {t("services.english.item6")}</li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge variant="secondary">{t("skills.speaking")}</Badge>
                  <Badge variant="secondary">{t("skills.writing")}</Badge>
                  <Badge variant="secondary">{t("skills.grammar")}</Badge>
                  <Badge variant="secondary">{t("skills.business")}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t("projects.title")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between dark:text-slate-100">
                  {t("projects.ecommerce.title")}
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://nikbr-eth-voting-dapp.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://github.com/nikbr/PortfolioMonorepo/tree/master/apps/EthVoting" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="dark:text-slate-300">{t("projects.ecommerce.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">React + Vite</Badge>
                  <Badge variant="outline">Web3</Badge>
                  <Badge variant="outline">Truffle</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between dark:text-slate-100">
                  {t("projects.language.title")}
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://nikbr-cat-facts.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://github.com/nikbr/PortfolioMonorepo/tree/master/apps/CatFactsJS" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="dark:text-slate-300">{t("projects.language.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">JavaScript ES6</Badge>
                  <Badge variant="outline">HTML</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between dark:text-slate-100">
                  {t("projects.portfolio.title")}
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://nikbr-user-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href="https://github.com/nikbr/PortfolioMonorepo/tree/master/apps/UserDashboardTS" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="dark:text-slate-300">{t("projects.portfolio.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Typescript</Badge>
                  <Badge variant="outline">HTML</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {t("contact.title")}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-slate-600 dark:text-slate-300 text-lg">{t("contact.description")}</p>
          </div>

          <Card className="shadow-xl border-0 dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-8">
              <form  onSubmit={handleSubmit(onValid)} action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                <input type="hidden" name="access_key" value="7fac1735-b4e7-466c-b34d-afc03a51cf5d"/>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-slate-200">
                      {t("contact.name")}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t("contact.namePlaceholder")}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                       {...register('name', { required: t('contact.nameRequired') })}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-slate-200">
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                      {...register('email', {
                        required: t('contact.emailRequired'),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('contact.emailInvalid'),
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="dark:text-slate-200">
                    {t("contact.subject")}
                  </Label>
                  <Input
                    id="subject"
                    placeholder={t("contact.subjectPlaceholder")}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                    {...register('subject', { required: t('contact.subjectRequired') })}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="dark:text-slate-200">
                    {t("contact.message")}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t("contact.messagePlaceholder")}
                    rows={6}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                    {...register('message', {
                      required: t('contact.messageRequired'),
                      minLength: { value: 10, message: t('contact.messageMin') },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  reCaptchaCompat={false}
                  onVerify={onHCaptchaChange} 
                /> 
                {errors['h-captcha-response'] && (
                  <p className="text-xs text-red-500">
                    {errors['h-captcha-response']?.message}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {t("contact.send")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-300">{t("footer.rights")}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                <a href="https://github.com/nikbr" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white">
                <a href="https://hh.ru/resume/454fde6cff0d17cc570039ed1f4f7774527152" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/images/hh.png"
                    alt="HeadHunter"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

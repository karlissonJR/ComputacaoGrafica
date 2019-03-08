from OpenGL.GL import *
from textura import obterTextura

class Objeto:

    def __init__(self, altura, largura, posX, posY, textura, imagens, velocidade=0,
                 paradoDireita=True, paradoEsquerda=False,
                 correndoDireita=False, correndoEsquerda=False,
                 gravidade=False, pulo=False):

        self.__altura = altura + posY
        self.__largura = largura + posX
        self.__posX = posX
        self.__posY = posY
        self.__textura = textura
        self.__imagens = imagens
        self.__velocidade = velocidade

        #estado do objeto
        self.__paradoDireita = paradoDireita
        self.__paradoEsquerda = paradoEsquerda
        self.__correndoDireita = correndoDireita
        self.__correndoEsquerda = correndoEsquerda
        self.__gravidade = gravidade
        self.__pulo = pulo

        self.__cont = 0
        self.__aux = 0
        self.__contPulo = 0

    def getObjeto(self):
        glColor4ub(255, 255, 255, 255)
        glEnable(GL_TEXTURE_2D)
        glBindTexture(GL_TEXTURE_2D, self.__textura)
        
        glBegin(GL_QUADS)
        
        glTexCoord2d(0, 0)
        glVertex2f(self.__posX, self.__altura)
        glTexCoord2d(1, 0)
        glVertex2f(self.__largura, self.__altura)
        glTexCoord2d(1, 1)
        glVertex2f(self.__largura, self.__posY)
        glTexCoord2d(0, 1)
        glVertex2f(self.__posX, self.__posY)
        
        glEnd()

        glDisable(GL_TEXTURE_2D)

    def setImagens(self, imagens):
        self.__imagens = imagens

    def setTextura(self, textura):
        self.__textura = textura

    def moverPraDireita(self):
        self.__posX += self.__velocidade
        self.__largura += self.__velocidade

    def moverPraEsquerda(self):
        self.__posX -= self.__velocidade
        self.__largura -= self.__velocidade

    def moverPraBaixo(self):
        self.__posY -= self.__velocidade
        self.__altura -= self.__velocidade

    def moverPraCima(self):
        self.__posY += self.__velocidade
        self.__altura += self.__velocidade

    def setParadoDireita(self, paradoDireita):
        self.__paradoDireita = paradoDireita

    def getParadoDireita(self):
        return self.__paradoDireita

    def setParadoEsquerda(self, paradoEsquerda):
        self.__paradoEsquerda = paradoEsquerda

    def getParadoEsquerda(self):
        return self.__paradoEsquerda

    def setCorrendoDireita(self, correndoDireita):
        self.__correndoDireita = correndoDireita

    def getCorrendoDireita(self):
        return self.__correndoDireita

    def setCorrendoEsquerda(self, correndoEsquerda):
        self.__correndoEsquerda = correndoEsquerda

    def getCorrendoEsquerda(self):
        return self.__correndoEsquerda

    def getPosX(self):
        return self.__posX

    def getPosY(self):
        return self.__posY

    def setCont(self, cont):
        self.__cont = cont

    def getGravidade(self):
        return self.__gravidade

    def setGravidade(self, gravidade):
        self.__gravidade = gravidade

    def getPulo(self):
        return self.__pulo

    def setPulo(self, pulo):
        self.__pulo = pulo

    def animacao(self):
        tamanho = len(self.__imagens)
        novaTextura = obterTextura(self.__imagens[self.__cont])
        self.setTextura(novaTextura)

        self.__aux += 1
        if(self.__aux > 3):
            self.__aux = 0
            self.__cont += 1
            if(self.__cont >= tamanho):
                if self.__pulo or self.__gravidade:
                    self.__cont = tamanho-1
                else:
                    self.__cont = 0

        if(self.__correndoDireita):
            self.moverPraDireita()

        if(self.__correndoEsquerda):
            self.moverPraEsquerda()

        if(self.__gravidade and not self.__pulo):
            self.moverPraBaixo()

        if(self.__pulo):
            self.__contPulo += 1

            for i in range(3):
                self.moverPraCima()

            if self.__contPulo == 13:
                self.setPulo(False)
                self.__contPulo = 0
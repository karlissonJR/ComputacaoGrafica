from OpenGL.GL import *
from textura import obterTextura

class Objeto:

    def __init__(self, altura, largura, posX, posY, textura, imagens, velocidade=0, parado=True, direita=False, esquerda=False):
        self.__altura = altura + posY
        self.__largura = largura + posX
        self.__posX = posX
        self.__posY = posY
        self.__textura = textura
        self.__imagens = imagens
        self.__velocidade = velocidade

        #estado do objeto
        self.__parado = parado
        self.__direita = direita
        self.__esquerda = esquerda

        self.__cont = 0
        self.__aux = 0

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

    def setParado(self, parado):
        self.__parado = parado

    def getParado(self):
        return self.__parado

    def setDireita(self, direita):
        self.__direita = direita

    def getDireita(self):
        return self.__direita

    def setEsquerda(self, esquerda):
        self.__esquerda = esquerda

    def getEsquerda(self):
        return self.__esquerda

    def getPosX(self):
        return self.__posX

    def animacao(self):
        tamanho = len(self.__imagens)
        novaTextura = obterTextura(self.__imagens[self.__cont])
        self.setTextura(novaTextura)

        self.__aux += 1
        if(self.__aux > 3):
            self.__aux = 0
            self.__cont += 1
            if(self.__cont >= tamanho):
                self.__cont = 0

        if not self.__parado:
            if(self.__direita):
                self.moverPraDireita()

            if(self.__esquerda):
                self.moverPraEsquerda()
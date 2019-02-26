from OpenGL.GL import *
from textura import obterTextura

class Objeto:

    aux = 0
    cont = 0

    def __init__(self, altura, largura, posX, posY, textura, imagens):
        self.__altura = altura
        self.__largura = largura
        self.__posX = posX
        self.__posY = posY
        self.__textura = textura
        self.__imagens = imagens

        #estado do objeto
        self.__direita = False
        self.__esquerda = False

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
        self.__posX += 1
        self.__largura += 1

    def moverPraEsquerda(self):
        self.__posX -= 1
        self.__largura -= 1

    def setDireita(self, direita):
        self.__direita = direita

    def setEsquerda(self, esquerda):
        self.__esquerda = esquerda

    def animacao(self):
        tamanho = len(self.__imagens)
        novaTextura = obterTextura(self.__imagens[Objeto.cont])
        self.setTextura(novaTextura)

        Objeto.aux += 1
        if(Objeto.aux > 3):
            Objeto.aux = 0
            Objeto.cont += 1
            if(Objeto.cont >= tamanho):
                Objeto.cont = 0

        if(self.__direita):
            self.moverPraDireita()

        if(self.__esquerda):
            self.moverPraEsquerda()
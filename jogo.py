import pygame

from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *

from textura import obterTextura
from sprites import *
from objeto import Objeto

DISPLAY_WIDTH = 1250
DISPLAY_HEIGHT = 700
FPS = 60

pygame.init()
display =  pygame.display.set_mode((DISPLAY_WIDTH, DISPLAY_HEIGHT), DOUBLEBUF|OPENGL|OPENGLBLIT)
pygame.display.set_caption("titulo")
clock = pygame.time.Clock()

x_inicial = 0
x_final = 250
y_inicial = 0
y_final = 200

glLoadIdentity()
gluOrtho2D(x_inicial, x_final, y_inicial, y_final)
glClearColor(1, 1, 1, 1)
glShadeModel(GL_SMOOTH)
glMatrixMode(GL_PROJECTION)
glLoadIdentity()
glDisable(GL_DEPTH_TEST)

glEnable(GL_BLEND)
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

executando = True
contPulo = 0

#jogador
imgJogador = obterTextura(jogador_parado_direita[0])
posX = 10
posY = 30
altura = 20
largura = 15
velocidadeJogador = 1
jogador = Objeto(altura, largura, posX, posY, imgJogador, jogador_parado_direita, velocidadeJogador)

#imagem de fundo
imgFundo = obterTextura("img/fundo/BG.png")
fundo = Objeto(200, 250, x_inicial, y_inicial, imgFundo, ["img/fundo/BG.png"])

#chao1
imgChao1 = obterTextura("img/chao/2.png")
chao1 = Objeto(26, x_final, x_inicial, y_inicial, imgChao1, ["img/chao/2.png"])

#chao2
imgChao2 = obterTextura("img/chao/14.png")
chao2 = Objeto(10, 20, 175, 50, imgChao2, ["img/chao/14.png"])

#chao3
imgChao3 = obterTextura("img/chao/15.png")
chao3 = Objeto(10, 20, 195, 50, imgChao3, ["img/chao/15.png"])

#chao3
imgChao4 = obterTextura("img/chao/16.png")
chao4 = Objeto(10, 20, 215, 50, imgChao4, ["img/chao/16.png"])

#cactos
imgCacto = obterTextura("img/objetos/Cactus (1).png")
cacto = Objeto(30, 15, 35, 26, imgCacto, ["img/objetos/Cactus (1).png"])

while executando:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            executando = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                jogador.setCorrendoDireita(True)
                jogador.setParadoDireita(False)
                jogador.setCorrendoEsquerda(False)
                jogador.setParadoEsquerda(False)

            if event.key == pygame.K_LEFT:
                jogador.setCorrendoDireita(False)
                jogador.setParadoDireita(False)
                jogador.setCorrendoEsquerda(True)
                jogador.setParadoEsquerda(False)

            if event.key == pygame.K_UP and not jogador.getPulo():
                jogador.setPulo(True)

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_RIGHT:
                jogador.setCorrendoDireita(False)
                jogador.setParadoEsquerda(False)

                if jogador.getCorrendoEsquerda():
                    jogador.setParadoDireita(False)

                else:
                    jogador.setParadoDireita(True)
                    jogador.setCorrendoEsquerda(False)

            if event.key == pygame.K_LEFT:
                jogador.setCorrendoEsquerda(False)
                jogador.setParadoDireita(False)

                if jogador.getCorrendoDireita():
                    jogador.setParadoEsquerda(False)

                else:
                    jogador.setParadoEsquerda(True)
                    jogador.setCorrendoDireita(False)

    if jogador.getPosY() > chao1.getPosY()+26:
        jogador.setGravidade(True)

    if jogador.getPosY() == chao1.getPosY()+26 and jogador.getGravidade():
        jogador.setGravidade(False)

    if jogador.getPosY() == chao2.getPosY()+10 and jogador.getGravidade() and jogador.getPosX()+largura > 175 and jogador.getPosX() < 235:
        jogador.setGravidade(False)

    #condições de animações
    if jogador.getPulo() and jogador.getGravidade():
        jogador.setCont(0)

        if jogador.getCorrendoDireita() or jogador.getParadoDireita():
            jogador.setImagens(jogador_pulando_direita)

        else:
            jogador.setImagens(jogador_pulando_esquerda)

    elif jogador.getGravidade() and not jogador.getPulo():
        jogador.setCont(0)

        if jogador.getCorrendoDireita() or jogador.getParadoDireita():
            jogador.setImagens(jogador_caindo_direita)

        else:
            jogador.setImagens(jogador_caindo_esquerda)

    elif jogador.getParadoDireita():
        jogador.setImagens(jogador_parado_direita)

    elif jogador.getParadoEsquerda():
        jogador.setImagens(jogador_parado_esquerda)

    elif jogador.getCorrendoDireita():
        jogador.setImagens(jogador_correndo_direita)

    elif jogador.getCorrendoEsquerda():
        jogador.setImagens(jogador_correndo_esquerda)

    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT)

    fundo.getObjeto()
    chao1.getObjeto()
    chao2.getObjeto()
    chao3.getObjeto()
    chao4.getObjeto()
    cacto.getObjeto()

    jogador.getObjeto()
    jogador.animacao()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
quit()
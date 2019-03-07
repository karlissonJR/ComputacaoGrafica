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

#jogador
imgJogador = obterTextura(jogador_parado_direita[0])
posX = 10
posY = 26
altura = 20
largura = 15
velocidadeJogador = 1
jogador = Objeto(altura, largura, posX, posY, imgJogador, jogador_parado_direita, velocidadeJogador)

#imagem de fundo
imgFundo = obterTextura("img/fundo/BG.png")
fundo = Objeto(200, 250, x_inicial, y_inicial, imgFundo, ["img/fundo/BG.png"])

#chao
imgChao1 = obterTextura("img/chao/2.png")
chao1 = Objeto(26, x_final, x_inicial, y_inicial, imgChao1, ["img/chao/2.png"])

#cactos
imgCacto = obterTextura("img/objetos/Cactus (1).png")
cacto = Objeto(30, 15, 35, 26, imgCacto, ["img/objetos/Cactus (1).png"])

while executando:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            executando = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                jogador.setDireita(True)
                jogador.setParado(False)
                jogador.setImagens(jogador_correndo_direita)

            if event.key == pygame.K_LEFT:
                jogador.setEsquerda(True)
                jogador.setParado(False)
                jogador.setImagens(jogador_correndo_esquerda)

        if event.type == pygame.KEYUP:
            if event.key == pygame.K_RIGHT:
                jogador.setDireita(False)
                jogador.setParado(True)
                jogador.setImagens(jogador_parado_direita)

            if event.key == pygame.K_LEFT:
                jogador.setEsquerda(False)
                jogador.setParado(True)
                jogador.setImagens(jogador_parado_esquerda)

    glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT)

    fundo.getObjeto()
    chao1.getObjeto()
    cacto.getObjeto()

    jogador.getObjeto()
    jogador.animacao()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
quit()
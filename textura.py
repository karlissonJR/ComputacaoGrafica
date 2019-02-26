from OpenGL.GL import *
from PIL import Image

def obterTextura(arquivo):

    textura = glGenTextures(1)
    #glPixelStorei(GL_UNPACK_ALIGNMENT, 4)
    glBindTexture(GL_TEXTURE_2D, textura)

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT)

    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR)
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR)

    # PIL can open BMP, EPS, FIG, IM, JPEG, MSP, PCX, PNG, PPM
    # and other file types.  We convert into a texture using GL.
    try:
        imagem = Image.open(arquivo)
    except IOError as ex:
        print('IOError: failed to open texture file')
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        return -1

    img = imagem.convert("RGBA").tobytes()

    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, imagem.size[0], imagem.size[1],
        0, GL_RGBA, GL_UNSIGNED_BYTE, img)

    imagem.close()
    return textura
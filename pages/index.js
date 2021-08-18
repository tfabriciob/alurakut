import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRealtions';

function ProfileSidebar(propriedades) {
    return (
        <Box as="aside">
            <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
            <hr />
            
            <p>
                <a className="boxLink" href={`https://www.linkedin.com/in/tfabriciob`}>
                    {propriedades.githubUser}
                </a><hr />
            </p>
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

function ProfileRelationsBox(propriedades) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {propriedades.title} ({propriedades.items.length})
                <hr />
            </h2>
            <ul>
                {/* {seguidores.map((itemAtual) => {
                    return (
                        <li key={itemAtual}>
                            <a href={`https://github.com/${itemAtual}.png`}>
                                <img src={itemAtual.image} />
                                <span>{itemAtual.title}</span>
                            </a>
                        </li>
                    )
                })} */}
      </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default function Home() {
    const usuarioAleatorio = 'tfabriciob';
    const [comunidades, setComunidades] = React.useState([{
        id: '97946542314697986546313465949',
        title: 'Eu odeio acordar cedo',
        image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
    // const comunidades = comunidades[0];
    // const alteradorDeComunidades/setComunidades = comunidades[1];
    // const comunidades = ['Alurakut'];
    const pessoasFavoritas = [
        'rafaballerini',
        'felipefialho',
        'juunegreiros',
        'omariosouto',
        'jhonatan36',
        'caiotomich'
    ]

    const [seguidores, setSeguidores] = React.useState([]);
    // 0 - Pegar o array de dados do github 
    React.useEffect(function() {
        fetch('https://api.github.com/users/tfabriciob/followers')
        .then(function (respostaDoServidor) {
            return respostaDoServidor.json();
        })
        .then(function(respostaCompleta) {
            setSeguidores(respostaCompleta);
        })
    }, [])

    console.log('seguidores antes do return', seguidores);

    // 1 - Criar um box que vai ter um map, baseado nos items do array que pegamos do GitHub

    return (
        <>
            <AlurakutMenu />
            <MainGrid>
                {/* <Box style="grid-area: profileArea;"> */}
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={usuarioAleatorio} />
                </div>
                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box>
                        <h1 className="title">Bem Vindo(a) Geek!<hr /></h1>
                        <OrkutNostalgicIconSet />
                    </Box>

                    <Box>
                        <h2 className="subTitle">O que deseja fazer hoje?</h2>
                        <form onSubmit={function hadleCriaComunidade(e) {
                            e.preventDefault(); //para de fazer o comportamento normal que seria o refresh
                            const dadosDoForm = new FormData(e.target);
                            
                            console.log('Campo: ', dadosDoForm.get('title'));
                            console.log('Campo: ', dadosDoForm.get('image'));

                            const comunidade = {
                                id: new Date().toISOString(),
                                title: dadosDoForm.get('title'),
                                image: dadosDoForm.get('image'),
                            }

                            const comunidadesAtualizadas = [...comunidades, comunidade];
                            setComunidades(comunidadesAtualizadas)
                        }}>
                            <div>
                                <input 
                                    placeholder="Qual será o nome da sua comunidade?"
                                    name="title"
                                    arial-label="Qual será o nome da sua comunidade?"
                                    type="text"
                                />
                            </div>
                            <div>
                                <input 
                                    placeholder="Coloque uma URL para usarmos de capa"
                                    name="image"
                                    arital-label="Coloque uma URL para usarmos de capa"
                                />
                            </div>
                            <button>
                                Criar cominidade
                            </button>
                        </form>
                    </Box>
                </div>
                <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
                    <ProfileRelationsBox title="Seguidores" items={seguidores} />
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                        Comunidades ({comunidades.length})
                        </h2>
                        <ul>
                        {comunidades.map((itemAtual) => {
                            return (
                            <li key={itemAtual.id}>
                                <a href={`/users/${itemAtual.title}`}>
                                <img src={itemAtual.image} />
                                <span>{itemAtual.title}</span>
                                </a>
                            </li>
                            )
                        })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                    <ProfileRelationsBoxWrapper>
                        <h2 className="smallTitle">
                        DEV's inspiradores ({pessoasFavoritas.length})
                        </h2>

                        <ul>
                        {pessoasFavoritas.map((itemAtual) => {
                            return (
                            <li key={itemAtual}>
                                <a href={`/users/${itemAtual}`}>
                                <img src={`https://github.com/${itemAtual}.png`} />
                                <span>{itemAtual}</span>
                                </a>
                            </li>
                            )
                        })}
                        </ul>
                    </ProfileRelationsBoxWrapper>
                </div>
            </MainGrid>
        </>
    )
}
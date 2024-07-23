import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from "../../hooks/useFetchDocument"
import styles from './Form.module.css'


const EditDoc = () => {

    const { id } = useParams()
    const {document: casa} = useFetchDocument('venda', id)

    const [imagens, setImagens] = useState([])
    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState(0)
    const [local, setLocal] = useState('')
    const [endereco, setEndereco] = useState('')
    const [quartos, setQuartos] = useState(0)
    const [banheiros, setBanheiros] = useState(0)
    const [garagem, setGaragem] = useState(false)
    const [piscina, setPiscina] = useState(false)
    const [descricao, setDescricao] = useState('')
    const [venda, setVenda] = useState(true)
    const [aluguel, setAluguel] = useState(false)
    const [formError, setFormError] = useState("")
    const [mtsqdd, setMtsqdd] = useState('')

    useEffect(() => {
        if(casa) {
            setTitulo(casa.titulo)
            setValor(casa.valor)
            setLocal(casa.local)
            setEndereco(casa.endereco)
            setQuartos(casa.quartos)
            setBanheiros(casa.banheiros)
            setPiscina(casa.piscina)
            setGaragem(casa.garagem)
            setDescricao(casa.descricao)
            setImagens(casa.imagens)
            setAluguel(casa.aluguel)
            setMtsqdd(casa.area)
            setVenda(casa.venda)
        }
      }, [casa])

      const { updateDocument, response} = useUpdateDocument('venda')
      const navigate = useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault()

        if(aluguel === true){
          setVenda(false)
        } else {
          setVenda(true)
        }

        if(titulo === '' || local === ''){
            setFormError('preencha todos os campos obrigatorios')
            return
        }

        if(mtsqdd !== '' && parseFloat(mtsqdd) === undefined){
          setFormError('Area foi preenchido de forma incorreta')
          return
        }
        
        if(mtsqdd === ''){
          setMtsqdd("0")
        }
    
        const area = parseFloat(mtsqdd)

        const preco = parseFloat(valor)    

        updateDocument(id, {
            titulo,
            valor: preco,
            local,
            endereco,
            quartos,
            banheiros,
            garagem,
            piscina,
            descricao,
            aluguel,
            area,
            venda
        })

        console.log(response)
        

        navigate("/dashboard")
      }
      if(formError !== ""){
        setTimeout(() => {
          setFormError("")
        }, 10000);
      }

  return (
    <div className={styles.form_container}>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label_input}>
            <span>Titulo:</span>
            <input type="text" name='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder='O lugar e/ou tipo de imovel'/>
          </label>
          <label className={styles.label_input}>
            <span>Valor:</span>
            <input type="number" name='valor' value={valor} onChange={(e) => setValor(e.target.value)} placeholder='Valor do imovel (,00 nao precisa ser inserido)'/>
          </label>
          <div className={styles.campos_adicionais}>
            <label>
              <input type="checkbox"  value={aluguel} onChange={(e) => setAluguel(e.target.checked)}/>
              <span> mês / aluguel:</span>
            </label>
            <label className={styles.label_input}>
              <span>Area: </span>
              <input type="text" value={mtsqdd} onChange={(e) => setMtsqdd(e.target.value)} placeholder='Area total'/>
            </label>
          </div>
          <label className={styles.label_input}>
            <span>Local:</span>
            <input type="text" name='local' value={local} onChange={(e) => setLocal(e.target.value)} placeholder='Apenas o bairro ou area do imovel'/>
          </label>
          <label className={styles.label_input}>
            <span>Endereço:</span>
            <input type="text" name='endereco' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='O endereço completo do imovel'/>
          </label>
          
          <div className={styles.adicionais}>
            <div className={styles.adicional_input}>
              <label className={styles.label_input}>
                <span>Quartos:</span>
                <input type="number" name='quartos' value={quartos} onChange={(e) => setQuartos(e.target.value)} placeholder='Numero de Quartos'/>
              </label>
              <label className={styles.label_input} >
                <span>Banheiros:</span>
                <input type="number" name='banheiros' value={banheiros} onChange={(e) => setBanheiros(e.target.value)} placeholder='Numero de Banheiros'/>
              </label>
            </div>

            <div className={styles.radio}>
              <label htmlFor="garagem">Garagem: </label>
              <div>
                <input type="radio" name='garagem' onChange={() => setGaragem(true)} checked={garagem}/> sim
                <input type="radio" name='garagem' onChange={() => setGaragem(false)} checked={!garagem}/> nao
              </div>
              <label htmlFor="piscina">Piscina: </label>
              <div>
                <input type="radio" name='piscina' onChange={() => setPiscina(true)} checked={piscina}/> sim
                <input type="radio" name='piscina' onChange={() => setPiscina(false)} checked={!piscina}/> nao
              </div>
            </div>
          </div>
            <label className={styles.text_area}>
              <span>Descrição:</span>
              <textarea value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)} placeholder='Descreva o imovel' ></textarea>
            </label>
            <div className={styles.imageGrid}>
              {imagens.map((imagem, index) => <img key={index} src={imagem} />)}
            </div>
            {formError === "" ? <button type='submit' className='primary_btn'>Atualizar Imovel</button> : <div>
              <p className='error'>{formError}</p>
              <button type='submit' className='primary_btn' disabled>Atualizar Imovel</button>
            </div>
              }
        </form>
    </div>
  )
}

export default EditDoc